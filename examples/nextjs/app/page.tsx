"use client";
import Image from "next/image";

import useAdvancedTypingAnimation from "../app/hooks/useAdvancedTypingAnimation"

import styles from "./page.module.css";


export default function Page(): JSX.Element {
  const [ref] = useAdvancedTypingAnimation<HTMLDivElement>(`
    <writing infinity="true">
        <cursor />
        <typewriter duration="10" mode="0">
        High-performance bundler for React Server Components and TypeScript codebases
        </typewriter>
    </writing>
  `)
  return (
    <div className={styles.main}>
      <div ref={ref}/>
    </div>
  )
}
