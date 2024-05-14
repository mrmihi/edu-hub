import { getCoursesByIds } from '../../../../../services';

export const calculateTotals = async (order) => {
  if (order.courses) {
    const courses = await getCoursesByIds(order.courses.map((product) => product._id));
    order.total = courses.reduce((total, course, index) => {
      total += course.paymentDetails.price * order.courses[index].quantity ?? 1;
      return total;
    }, 0);
  }
};
