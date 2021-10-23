import Person from "../db/models/Person";
import Course from "../db/models/Course";

export default class PeopleService {
  public static getPeople(year: number = new Date().getFullYear()) {
    const query = (year) ? {year} : {};
    const projection = {_private: 0, instructions: 0, attendances: 0};
    const sortQuery = {"_private.sortParam": 1};

    return Person.find(query, projection).sort(sortQuery);
  }

  public static async getPersonById(id: string) {
    const projection = { _private: 0 };
    const sortQuery = { "_private.sortParam": 1 };
    const person = await Person.findById(id, projection).sort(sortQuery);
    if (!person) {
      return null;
    }

    const attendedCourseIds = person.attendances.map(obj => obj.courseId);
    const instructedCourseIds = person.instructions.map(obj => obj.courseId);
    const courses = await Course.find(
      {_id: attendedCourseIds.concat(instructedCourseIds)},
      {attendances: 0, instructions: 0, _private: 0}
    ).sort(sortQuery);

    const attendedCourses = person.attendances.map(attendance => {
      const course = courses.find(c => c._id.equals(attendance.courseId));
      if (course) {
        return { ...(course.toObject()), result: attendance.result };
      }
    });

    const instructedCourses = person.instructions.map(instruction => {
      const course = courses.find(c => c._id.equals(instruction.courseId));
      if (course) {
        return { ...(course.toObject()), position: instruction.position };
      }
    });

    return { person, attendedCourses, instructedCourses };
  }

  public static deletePerson(id: string) {
    return Person.findByIdAndDelete(id);
  }
}