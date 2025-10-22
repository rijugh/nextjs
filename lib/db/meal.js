import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'

const db = sql('meals.db')
const dateTimeNow = () => new Date().toISOString().replace(/:/g, '-')

export async function getAllMeals() {
  await new Promise((res) => setTimeout(res, 2000)) // Simulate a delay (reduced to 2s)
  const query = db.prepare('SELECT * FROM meals ORDER BY id DESC')
  const meals = query.all()
  // throw new Error('Failed to fetch meals')
  return meals
}

export async function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })

  // Check if slug already exists and make it unique if needed
  let slugToUse = meal.slug
  let counter = 1
  while (db.prepare('SELECT slug FROM meals WHERE slug = ?').get(slugToUse)) {
    slugToUse = `${meal.slug}-${counter}`
    counter++
  }
  meal.slug = slugToUse

  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const fileName = `${meal.slug}_${dateTimeNow()}.${extension}`

  // Ensure the directory exists
  const uploadDir = 'public/images'
  // if (!fs.existsSync(uploadDir)) {
  //   fs.mkdirSync(uploadDir, { recursive: true })
  // }
  // const bufferedImage = await meal.image.arrayBuffer()
  // Write the file synchronously to ensure it completes before continuing
  // fs.writeFileSync(`${uploadDir}/${fileName}`, Buffer.from(bufferedImage))

  const stream = fs.createWriteStream(`${uploadDir}/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw Error('Failed to save image')
    }
  })
  stream.end()

  meal.image = `/images/${fileName}`
  const query = db.prepare(`
    INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES 
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `)
  const result = query.run(meal)
}
