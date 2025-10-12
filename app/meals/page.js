import Link from 'next/link'

export default function MealsPage() {
  return (
    <main>
      <h1>Meals Page</h1>
      <ul>
        <ol>
          <li>
            <Link href='/meals/meal-1'>Meal 1</Link>
          </li>
          <li>
            <Link href='/meals/meal-2'>Meal 2</Link>
          </li>
          <li>
            <Link href='/meals/meal-3'>Meal 3</Link>
          </li>
        </ol>
        <li>
          <Link href='/meals/share'>Share a meal</Link>
        </li>
      </ul>
    </main>
  )
}
