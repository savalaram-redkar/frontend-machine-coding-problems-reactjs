import Accordion from "./Accordion";

function App ()
{
  const accordionData = [
    {
      title: "How many bones does a cat have?",
      content: "A cat has 230 bones - 6 more than a human",
    },
    {
      title: "How much do cats sleep?",
      content: "The average cat sleeps 12-16 hours per day",
    },
    {
      title: "How long do cats live",
      content: "Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
    },
  ]

  return (
    <>
      { accordionData?.length > 0 && accordionData.map( ( { title, content } ) => (
        <Accordion key={ title } title={ title } content={ content } />
      ) ) }
    </>
  )
}

export default App
