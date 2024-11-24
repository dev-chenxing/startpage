import { motion } from "motion/react"

const avatar = `\
░░░░░░░░░░░░░░░░░
░░░░░▀▄░░░▄▀░░░░░ 
░░░░▄█▀███▀█▄░░░░
░░░█▀███████▀█░░░
░░░█░█▀▀▀▀▀█░█░░░
░░░░░░▀▀░▀▀░░░░░░
░░░░░░░░░░░░░░░░░`

const infoList = [
    { name: "User", value: "陈刑" },
    { name: "Code", value: "56% vim, 16% lua, 6% h" }
]

const socials = [
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-red" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-green" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-yellow" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-blue" },
    { text: "󰇮 ", href: "chenxing.io@outlook.com", color: "text-magenta" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-cyan" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-white" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-grey" },
]

export default function InfoFetcher() {
    return (
        <motion.div
            className="border text-white flex p-2"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            layout
        >
            <pre className="my-0 leading-tight">
                {avatar}
            </pre>
            <div>
                {infoList.map((info) => {
                    return <p><span className="text-blue">{info.name}: </span>{info.value}</p>
                })}
                <p className="flex gap-2 text-lg">{socials.map((social, index) => {
                    return (
                        <a key={index} href={social.href} className={"no-underline " + social.color}>{social.text}</a>
                    )
                })}</p>
            </div>
        </motion.div>
    );
}