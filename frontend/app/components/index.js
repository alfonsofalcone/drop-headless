import Hero from "@/app/components/sections/Hero";
import Heading from '@/app/components/sections/Heading';
import FullImage from '@/app/components/sections/FullImage';
import Text from "@/app/components/sections/Text";
import Cases from "@/app/components/sections/Cases";
import CarouselLogos from "./sections/CarouselLogos";
import CaseDetailsSection from "./sections/CaseDetails";
import GoalsList from "./sections/GoalsList";

const componentsMap = {
  "sections.hero": Hero,
  "sections.heading": Heading,
  "sections.full-image": FullImage,
  "sections.text": Text,
  "sections.cases": Cases,
  "sections.carousel-logos": CarouselLogos,
  "sections.case-details": CaseDetailsSection,
  "sections.goals-list": GoalsList
};

export default componentsMap;
