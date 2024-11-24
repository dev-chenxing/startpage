export default function Bunny() {
    const bunny = ""
    return <div className="m-4 flex flex-col justify-center">
        {bunny.split("\n").map((line) => {
            return <p className="!m-0 p-0">{line}</p>
        })}
    </div>
}