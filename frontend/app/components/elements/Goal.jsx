"use client";
import styles from "@/sass/elements/Goal.module.scss";

export default function Goal({ data, goalIndex }) {
  if (!data) {
    return null;
  }

  return(
    <div key={goalIndex} className={`${styles['goal']} relative flex items-start border-b py-8`}>
      <span className={`${styles['goal-pill']} px-4 mr-2 text-lg rounded-full`}>{String.fromCharCode(65 + goalIndex)}</span>
      <span className={`${styles['goal-description']}`}>{data.goalDescription}</span>
    </div>
  )
}
