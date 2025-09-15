import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

type AccordionProps = {
  id: string;
  title: string;
  description: string;
};

const list: AccordionProps[] = [
  {
    id: "1",
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: "2",
    title: "Title 2",
    description: "Description 2",
  },
  {
    id: "3",
    title: "Title 3",
    description: "Description 3",
  },
];

const CalendarDisplay = () => {
  return (
    <div className="w-full">
  <Accordion type="single">
        {list.map((item) => (
          <AccordionItem value={item.id}>
            <AccordionTrigger> {item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CalendarDisplay;
