import sql from 'better-sqlite3'

const db = sql('meals.db')

export async function getAllMeals() {
  await new Promise((res) => setTimeout(res, 2000)) // Simulate a delay (reduced to 2s)
  const query = db.prepare('SELECT * FROM meals ORDER BY id DESC')
  const meals = query.all()
  // throw new Error('Failed to fetch meals')
  return meals
}
