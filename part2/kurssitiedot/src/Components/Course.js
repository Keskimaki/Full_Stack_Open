import React from 'react'

const Header = ( {text} ) => <h1>{text}</h1>

const Subheader = ( {text} ) => <h2>{text}</h2>

const Part = ( {name, exercises} ) => <p>{name} {exercises}</p>

const Total = ( {total} ) => {
  return (<p><strong>total of {total} exercises</strong></p>)
}

const Content = ( {parts} ) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Total total={parts.map(part => part.exercises).reduce( (acc, curr) => acc + curr)} />
    </>
  )
}

const Course = ( {courses} ) => {
  return (
    <>
      <Header text="Web development curriculum"/>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Subheader text={course.name}/>
            <Content parts={course.parts}/>
          </div>
        )
      })}
    </>
  )
}

export default Course