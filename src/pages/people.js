import * as React from "react"
import Navigation from "../components/navigation"
import { RoundedContainer } from '../components/containers'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { graphql } from 'gatsby'
import { data } from "autoprefixer"
import { Link, RichText } from 'prismic-reactjs'
import htmlSerializer from "../components/htmlSerializer"

const PeopleProfile = (props) => {
    return (
        <div className="flex flex-none flex-col items-center align-center w-full lg:w-96 m-10">
            <GatsbyImage image={props.image} alt={props.name + " picture"} className="h-44 w-44 rounded-full flex-shrink-0"  imgClassName="rounded-full"></GatsbyImage>
            <h3 className="text-center text-xl font-semibold">{props.name}</h3>
            <h4 className="text-center text-l font-semibold text-gray-500">{props.role}</h4>
            <RichText render={props.description} htmlSerializer={htmlSerializer}/>
        </div>
    )
}

const PeoplePage = ({data}) => {
  const document = data.prismicPeople.data
  console.log(document)
  const peopleList = document.people_list.map((person, index) => 
    <PeopleProfile
      image={person.profile.gatsbyImageData}
      name={person.name.text}
      role={person.role}
      description={person.description.raw}
      key={index}
    />
  );
  console.log(peopleList)
  return (
    <div className="bg-purple-200 h-full w-full flex flex-col">
      <Navigation></Navigation>
      <RoundedContainer>
        <h2 className="text-4xl font-semibold text-center">{document.title.text}</h2>
        <div className="flex flex-row flex-wrap justify-center">
          {peopleList}
        </div>
      </RoundedContainer>
    </div>
  )
}

export const query = graphql`
  query People {
    prismicPeople {
      data {
        title {
          text
        }
        people_list {
          profile {
            gatsbyImageData(placeholder: NONE)
          }
          name {
            text
          }
          role
          description {
            raw
          }
        }
      }
    }
  }
`

export default PeoplePage
