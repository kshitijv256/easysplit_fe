// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculate = (data: any) => {
  const total = data.amount;
  const forUsers = data.for;
  const paidBy = data.by;
  const amount = total / forUsers.length;
  const result = forUsers.map((user: number) => {
    if (user === paidBy) {
      return { id: user, amount: amount - total };
    } else {
      return { id: user, amount: amount };
    }
  });
  return result;
};
