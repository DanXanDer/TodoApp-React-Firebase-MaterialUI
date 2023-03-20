import { getDocs } from "firebase/firestore/lite";

export const getTasks = async ({ user, todo }) => {
  try {
    const tasks = [];

    const taskDocs = await getDocs(
      collection(FireBaseDB, `/users/${user.uid}/todos/${todo.id}/tasks`)
    );

    taskDocs.forEach((task) => {
      const { id } = task;
      tasks.push({ id, ...task.data() });
    });

    return {
      ok: true,
      tasks,
    };
  } catch (error) {
    console.log(error.message);

    return {
      ok: false,
    };
  }
};
