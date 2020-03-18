// #1

console.log(process.argv)

// $ node console.js  # ->
[
  '/usr/local/bin/node',
  '/Users/Maxim/Documents/projects/nodejs-basics/ref/console.js',
]

// $ node console.js message=hello # spec ->
[
  '/usr/local/bin/node',
  '/Users/Maxim/Documents/projects/nodejs-basics/ref/console.js',
  'message=hello',
  'spec'
]



// #2

const consoleToJson = () => {
  const c = {}

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=')
    c[arg[0]] = !arg[1] ? true : arg[1]
  }

  return c
}

console.log(consoleToJson())

// $ node console.js message=hello spec  # ->
{
  massage: 'hello',
  spec: true
}
