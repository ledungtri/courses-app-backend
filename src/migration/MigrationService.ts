import { default as cells } from './seeds/cells.json';
import { default as students } from './seeds/students.json';
import { default as teachers } from './seeds/teachers.json';
import { default as instructions }  from './seeds/instructions.json';
import { default as attendances }  from './seeds/attendances.json';
import Course from '../db/models/Course';
import Person from '../db/models/Person';
import { Address } from '../model_interfaces/Address';
import { Instruction } from "../db/models/Instruction";
import { Attendance } from "../db/models/Attendance";
import { ObjectId } from "mongoose";
import TeacherIdMapping from "./TeacherIdMapping";
import CourseIdMapping from "./CourseIdMapping";
import StudentIdMapping from "./StudentIdMapping";

export default class MigrationService {
  public static json() {
    MigrationService.write(cells, 'cells');
    MigrationService.write(students, 'students');
    MigrationService.write(teachers, 'teachers');
    MigrationService.write(instructions, 'instructions');
    MigrationService.write(attendances, 'attendances');
  }

  private static write(docs: any, name:string) {
    const fs = require('fs');
    fs.writeFile(
      `./src/db/seeds/${name}.json`,
      JSON.stringify(docs),
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          return console.log(err);
        }
        console.log('file was saved!');
      },
    );
  }

  public static migrateCourses() {
    const promises = cells.map(async (cell) => {
      cell = MigrationService.renameField(cell, 'grade', 'family');

      if (cell.group) {
        if (cell.group.length === 2) {
          // @ts-ignore
          cell.level = cell.group.charAt(0);
          cell.group = cell.group.charAt(1);
        } else {
          // @ts-ignore
          if (!isNaN(cell.group)) {
            cell = MigrationService.renameField(cell, 'group', 'level');
          }
        }
      }
      if (cell.group === '') {
        MigrationService.deleteField(cell, 'group');
      }

      const newCourse = new Course(cell);

      const families = ["Khai Tâm", "Rước Lễ", "Thêm Sức", "Bao Đồng", "Vào Đời"];
      const familyOrder = families.indexOf(newCourse.family);
      newCourse._private.sortParam = `${(familyOrder == -1) ? newCourse.family : familyOrder} ${newCourse.level || ''}${newCourse.group || ''}`;

      const result = await newCourse.save();
      const idMapping = new CourseIdMapping({ type: 'course', oldId: cell.id, newId: result._id });
      await idMapping.save();
    });
    return Promise.all(promises);
  }

  public static migrateTeachers() {
    const promises = teachers.map(async (teacher) => {
      const address: Address = {
        streetNumber: teacher.street_number || undefined,
        streetName: teacher.street_name || undefined,
        ward: teacher.ward || undefined,
        district: teacher.district || undefined,
      };

      const newPerson = new Person({
        christianName: teacher.christian_name,
        fullName: teacher.full_name,
        namedDate: teacher.named_date,
        birth: { date: teacher.date_birth },
        occupation: teacher.occupation,
        phone: teacher.phone,
        email: teacher.email,
        address,
        _private: {
          sortParam: teacher.full_name.split(' ').reverse().join(' ')
        }
      });

      const result = await newPerson.save();
      const idMapping = new TeacherIdMapping({ type: 'teacher', oldId: teacher.id, newId: result._id });
      await idMapping.save();
    });
    return Promise.all(promises);
  }

  public static async migrateStudents() {
    const promises = students.map(async (student) => {
      const address: Address = {
        streetNumber: student.street_number,
        streetName: student.street_name,
        ward: student.ward,
        district: student.district,
        area: student.area,
        phone: student.phone,
      };

      const newPerson = new Person({
        christianName: student.christian_name,
        fullName: student.full_name,
        gender: student.gender,
        birth: { date: student.date_birth, place: student.place_birth },
        baptism: { date: student.date_baptism, place: student.place_baptism },
        communion: { date: student.date_communion, place: student.place_communion },
        confirmation: { date: student.date_confirmation, place: student.place_confirmation },
        declaration: { date: student.date_declaration, place: student.place_declaration },
        father: {
          christianName: student.father_christian_name,
          fullName: student.father_full_name,
          phone: student.father_phone,
        },
        mother: {
          christianName: student.mother_christian_name,
          fullName: student.mother_full_name,
          phone: student.mother_phone,
        },
        address,
        _private: {
          sortParam: student.full_name.split(' ').reverse().join(' ')
        }
      });

      const result = await newPerson.save();
      const idMapping = new StudentIdMapping({ type: 'student', oldId: student.id, newId: result._id });
      await idMapping.save();
    });
    return Promise.all(promises);
  }

  public static migrateAttendances() {
    const promises = attendances.map(async (attendance) => {
      const studentId = await MigrationService.getStudentNewId(attendance.student_id);
      const courseId = await MigrationService.getCourseNewId(attendance.cell_id);

      if (!studentId || !courseId) return;

      const newAttendance: Attendance = {
        studentId,
        courseId,
        year: attendance.year,
        result: attendance.result,
      };

      await Person.findByIdAndUpdate(studentId, { $addToSet: { attendances: newAttendance } });
      await Course.findByIdAndUpdate(courseId, { $addToSet: { attendances: newAttendance } });
    });
    return Promise.all(promises);
  }

  public static async migrateInstructions() {
    const promises = instructions.map(async (instruction) => {
      const teacherId = await MigrationService.getTeacherNewId(instruction.teacher_id);
      const courseId = await MigrationService.getCourseNewId(instruction.cell_id);

      if (!teacherId || !courseId) return;

      let newInstruction: Instruction = {
        courseId,
        teacherId,
        year: instruction.year || undefined,
        position: instruction.position || undefined,
      };

      await Person.findByIdAndUpdate(teacherId, { $addToSet: {instructions: newInstruction} });
      await Course.findByIdAndUpdate(courseId, { $addToSet: {instructions: newInstruction} });
    });
    return Promise.all(promises);
  }

  // @ts-ignore
  private static renameField(obj, oldName: string, newName: string) {
    // @ts-ignore
    obj[newName] = obj[oldName];
    return MigrationService.deleteField(obj, oldName);
  }

  // @ts-ignore
  private static deleteField(obj: any, fieldName: string) {
    // @ts-ignore
    delete obj[fieldName];
    return obj;
  }

  private static async getCourseNewId(oldId: number): Promise<ObjectId> {
    const idMapping = await CourseIdMapping.findOne({ oldId });
    return (idMapping) ? idMapping.newId : null;
  }

  private static async getTeacherNewId(oldId: number): Promise<ObjectId> {
    const idMapping = await TeacherIdMapping.findOne({ oldId });
    return (idMapping) ? idMapping.newId : null;
  }

  private static async getStudentNewId(oldId: number): Promise<ObjectId> {
    const idMapping = await StudentIdMapping.findOne({ oldId });
    return (idMapping) ? idMapping.newId : null;
  }
}
