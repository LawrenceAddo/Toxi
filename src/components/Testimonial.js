import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ backgroundColor: "black", color: "#ffd500", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ backgroundColor: "black", color: "#ffd500", fontSize: "45px" }} />
    </div>
  );
};
const Testimonial = () => {
  return (
    <div
      className="testimonial"
      style={{  backgroundColor: "black", display: "flex", justifyContent: "center" }}
    >
      <div style={{ backgroundColor: "black", width: "50%", textAlign: "center" }}>
        <h1 style={{ color: "#ffd500", marginBottom: 20 }}>TESTIMONIALS</h1>
        <Slider prevArrow={<PreviousBtn />} nextArrow={<NextBtn />} dots>
          <Card img="https://visualcontent.space/wp-content/uploads/2018/12/vcs_testimonials_riya_avatar_500.jpeg?x47988" />
          <Card img="https://visualcontent.space/wp-content/uploads/2018/12/vcs_testimonials_krasimir_500.jpeg?x47988" />
          <Card img="https://visualcontent.space/wp-content/uploads/2018/12/vcs_testimonials_tsvetelina_avatar_500.jpeg?x47988" />
          <Card img="https://static.wixstatic.com/media/1b9f36_d1039030f08049d79dda7b0e98658ea6~mv2.jpg/v1/fill/w_599,h_451,al_c,q_80,usm_0.66_1.00_0.01/1b9f36_d1039030f08049d79dda7b0e98658ea6~mv2.webp" />
          <Card img="https://pbs.twimg.com/media/Dfaoaf8UYAASUWk.png" />
        </Slider>
      </div>
    </div>
  );
};

const Card = ({ img }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          backgroundColor: "black",
          width: 120,
          height: 120,
          border: "1px solid lightgray",
          padding: 7,
          marginBottom: 20,
        }}
      />
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p style={{ fontStyle: "italic", marginTop: 25 }}>
        <span style={{ fontWeight: 500, color: "#ffd500" }}>Person</span> ,
        Developer
      </p>
    </div>
  );
};

export default Testimonial;