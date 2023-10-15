import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/kasa.png";
import projImg2 from "../assets/img/webfit.png";
import projImg3 from "../assets/img/laby.png";
import projImg4 from "../assets/img/Gen.png";
import projImg5 from "../assets/img/recipe.png";
import projImg6 from "../assets/img/meteo.png";
import projImg7 from "../assets/img/horloge.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects = [
    {
      title: "KASA",
      description:
        "Application web React de location immobilière, API intégrée",
      imgUrl: projImg1,
    },
    {
      title: "WEBFIT",
      description:
        "Site de coaching, présentation des différents programmes, contact par mail et présentation coach",
      imgUrl: projImg2,
    },
    {
      title: "Labyrinthe",
      description:
        "Jeu élaboré avec Javascript pour l'entreprise Alécol, pour petits et grands avec plusieurs niveaux de difficultés",
      imgUrl: projImg3,
    },
    {
      title: "Générateur de citations (EN)",
      description:
        "Petite application React faite à partir d'une API de citations",
      imgUrl: projImg4,
    },
    {
      title: "G la recette (EN)",
      description:
        "Application web React également faites à partir d'une API, choisissez un ingrédient et vous aurez une liste de recettes avec celui-ci",
      imgUrl: projImg5,
    },
    {
      title: "API Météo",
      description:
        "Vous donne la météo de n'importe quelle ville dans le monde",
      imgUrl: projImg6,
    },
  ];
  const projects2 = [
    {
      title: "Horloge",
      description: "Horloge donnant l'heure actuelle intégrée avec HTML/CC/JS",
      imgUrl: projImg7,
    },
    {
      title: "KASA",
      description:
        "Application web React de location immobilière, API intégrée",
      imgUrl: projImg1,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Projets</h2>
                  <p>
                    Projets réalisés dans le cadre de mes diplômes, lors de mon
                    stage ou même dans un contexte personnel. Ces différentes
                    réalisations m'ont permis de m'améliorer et de me dépasser.
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {projects2.map((project, index) => {
                          return <ProjectCard key={index} {...project} />;
                        })}
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>
                          Je suis constamment à l'affût des dernières tendances
                          technologiques et je m'engage à rester à jour pour
                          offrir des solutions adaptées aux besoins changeants
                          du marché.
                        </p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
