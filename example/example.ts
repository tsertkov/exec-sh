import execSh from '../'

(async () => {
  console.log(await execSh.promise('pwd'))
  console.log(await execSh.promise('pwd', true))
  execSh('pwd')
  execSh('pwd', true)
  execSh('pwd', {}, () => {})
  execSh('pwd', true, ( error: Error | null, stdout: string, stderr: string) => {
    console.log({ error, stdout, stderr })
  })
})()
