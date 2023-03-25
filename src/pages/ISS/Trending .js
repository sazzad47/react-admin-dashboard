import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ISSStream from "./ISSStream";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper";

const Trending = () => {
  return (
    <React.Fragment>
      <section className="section bg-light" id="categories">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                slidesPerView={2}
                spaceBetween={30}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper swiper mySwiper pb-4"
              >
                <div className="swiper-wrapper">
                  <SwiperSlide>
                    <Card>
                      <CardBody>
                        <Row className=" mb-3">
                          <Col lg={12}>
                            <ISSStream width="100%" height="100%" />
                          </Col>
                        </Row>
                        <Link to="#!" className="float-end">
                          {" "}
                          View All{" "}
                          <i className="ri-arrow-right-line align-bottom"></i>
                        </Link>
                        <h5 className="mb-0 fs-16">
                          <Link to="#!" className="link-dark">
                            Views{" "}
                            <span className="badge badge-soft-success">
                              206
                            </span>
                          </Link>
                        </h5>
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                </div>
                <div className="swiper-pagination swiper-pagination-dark"></div>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Trending;
