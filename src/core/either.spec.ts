import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  if (result.isRight()) {
    console.log(result.value)
  }

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = doSomething(false)

  if (result.isLeft()) {
    console.log(result.value)
  }

  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
