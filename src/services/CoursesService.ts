import Course from '../db/models/Course';
import Person from '../db/models/Person';

export default class CoursesService {
  public static getCourses(year: number = new Date().getFullYear()) {
    const query = (year) ? { year } : {};
    const projection = { _private: 0, instructions: 0, attendances: 0 };
    const sortQuery = { '_private.sortParam': 1 };

    return Course.find(query, projection).sort(sortQuery);
  }

  public static async getCourseById(id: string) {
    const projection = { _private: 0 };
    const sortQuery = { '_private.sortParam': 1 };
    const course = await Course.findById(id, projection).sort(sortQuery);
    if (!course) {
      return null;
    }

    const studentIds = course.attendances.map((att) => att.studentId);
    const teacherIds = course.instructions.map((ins) => ins.teacherId);
    const people = await Person.find(
      { _id: studentIds.concat(teacherIds) },
      { attendances: 0, instructions: 0, _private: 0 },
    ).sort(sortQuery);

    const students = course.attendances.map((attendance) => {
      const student = people.find((p) => p._id.equals(attendance.studentId));
      if (student) {
        return { ...(student.toObject()), result: attendance.result };
      }
    });

    const teachers = course.instructions.map((instruction) => {
      const teacher = people.find((p) => p._id.equals(instruction.teacherId));
      if (teacher) {
        return { ...(teacher.toObject()), position: instruction.position };
      }
    });
    return { course, students, teachers };
  }

  public static deleteCourse(id: string) {
    return Course.findByIdAndDelete(id);
  }
}
