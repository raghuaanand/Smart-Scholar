import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FrequentlyAsked() {
    return (
      <Accordion type="single" collapsible className="w-full p-4 mx-6">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes. It is free for a limited amount of time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it for everyone?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with all rouneded versions including every dimensions.it is mainly for &apos; student.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it costs monthly or yearly?</AccordionTrigger>
          <AccordionContent>
            it costs yearly and hpefully monthly will be included in the comming year, you can access all of the features of it with yearly payment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  