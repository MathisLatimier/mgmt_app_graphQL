import { GET_PROJECTS } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard";
import Spinner from "./Spinner";

export default function Home() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const get3RandomProjects = (projects) => {
    if (projects && projects.length > 0) {
      // Créer une copie du tableau avant de le trier
      const shuffled = [...projects].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, 3);
    }
    return [];
  };

  if (loading) return <Spinner />;
  if (error) return <div>Error loading projects</div>;

  const projects = data?.projects || [];

  return (
    <>
      <section>
        <h2 className="text-3xl font-medium mb-6">Top Projects</h2>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-10">
            {get3RandomProjects(projects).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div>There is no Project...</div>
        )}
      </section>
    </>
  );
}
