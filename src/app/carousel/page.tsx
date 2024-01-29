import first from "../../../public/bg2.jpg"
import second from "../../../public/Sans titre.png"
import third from "../../../public/Sans .jpeg"
import four from "../../../public/im.jpeg"
import Carousel from "@/components/carousel.component"
function App() {
  let slides = [
    first,
    second,
    third,
    "../../../public/im.jpeg"
  ];

  return (
    <div className="w-[60%] m-auto pt-11">
      <Carousel slides={slides} />
    </div>
  );
}

export default App;