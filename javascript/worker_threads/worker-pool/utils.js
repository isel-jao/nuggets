export async function task1(data) {
  // Simulate a task
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(`Task 1 complete with data ${JSON.stringify(data)}`),
      1000
    )
  );
}

export async function task2(data) {
  // Simulate another task
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(`Task 2 complete with data ${JSON.stringify(data)}`),
      1500
    )
  );
}
