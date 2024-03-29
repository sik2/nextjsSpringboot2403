export default function AboutLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <h1>소개페이지 공통요소</h1>
            {children}
        </>
    )
}