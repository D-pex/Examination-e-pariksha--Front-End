// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthLayout = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {children}
    </div>
  );
};