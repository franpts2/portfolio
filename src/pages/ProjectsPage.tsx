import React from "react";
import CardList from "../components/CardList.tsx";

const ProjectsPage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center gap-10">
            <h1 className="font-black text-4xl text-primary-accent mt-10">Projects</h1>
            <CardList />
        </div>
    );
};

export default ProjectsPage;