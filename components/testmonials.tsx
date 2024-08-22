import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

const testimonials = [
  { id: "1", name: "John Doe", content: "This is a fantastic service!", image: "/path/to/image1.jpg" },
  { id: "2", name: "Jane Smith", content: "I love using this platform!", image: "/path/to/image2.jpg" },
  { id: "3", name: "Sam Johnson", content: "Highly recommended for everyone!", image: "/path/to/image3.jpg" },
];

export function ScrollBasedVelocityDemo() {
  return (
    <VelocityScroll
      testimonials={testimonials}
      default_velocity={5}
      className="font-display grid grid-rows-2 text-center text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-5xl md:leading-[5rem]"
    />
  );
}
