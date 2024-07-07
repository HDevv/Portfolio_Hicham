import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "./NProjects.css";
import { useProjects } from "../../context/ProjectsContext";

function NProjects() {
  const { projects, setProjects } = useProjects();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProject, setNewProject] = useState({
    description: "",
    link: "",
    image: null,
  });
  const [editableProject, setEditableProject] = useState({
    id: "",
    description: "",

    link: "",
    image: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [setProjects]);

  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  const handleEditShow = (project) => {
    setEditableProject(project);
    setShowEditModal(true);
  };
  const handleEditClose = () => setShowEditModal(false);

  const handleAddProject = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", newProject.description);
    formData.append("link", newProject.link);
    if (newProject.image) {
      formData.append("image", newProject.image);
    }

    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "Failed to add project. Server responded with " + response.status
        );
      }

      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({ description: "", link: "", image: null });
      handleAddClose();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", editableProject.description);
    formData.append("link", editableProject.link);
    if (editableProject.image instanceof File) {
      formData.append("image", editableProject.image);
    }

    try {
      const addResponse = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!addResponse.ok) {
        throw new Error(
          "Failed to add project. Server responded with " + addResponse.status
        );
      }

      const updatedProject = await addResponse.json();

      const deleteResponse = await fetch(
        `http://localhost:3000/api/projects/${editableProject.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error(
          "Failed to delete project. Server responded with " +
            deleteResponse.status
        );
      }

      setProjects(
        projects.map((project) =>
          project.id === editableProject.id ? updatedProject : project
        )
      );
      handleEditClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "Failed to delete project. Server responded with " + response.status
        );
      }

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Container className="container-center">
      <h2>Projets</h2>
      <br />
      <Button variant="primary" onClick={handleAddShow}>
        Ajouter un projet
      </Button>
      <br />
      <Row>
        {projects.map((project, index) => (
          <Col key={index} md={4}>
            <div className="project-card">
              <h3>{project.description}</h3>
              <p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visiter le projet
                </a>
              </p>
              {project.image ? (
                <img src={project.image} alt={project.description} />
              ) : (
                <img src="/path/to/default-image.jpg" alt="Placeholder" />
              )}
              <Button variant="info" onClick={() => handleEditShow(project)}>
                Modifier
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteProject(project.id)}
              >
                Supprimer
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {/* Ajouter un nouveau projet */}
      <Modal show={showAddModal} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProject}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Lien</Form.Label>
              <Form.Control
                type="url"
                name="link"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) =>
                  setNewProject({ ...newProject, image: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Editer un projet existant */}
      <Modal show={showEditModal} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProject}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editableProject.description}
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Lien</Form.Label>
              <Form.Control
                type="url"
                name="link"
                value={editableProject.link}
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    link: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    image: e.target.files[0],
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Mettre à jour
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default NProjects;
