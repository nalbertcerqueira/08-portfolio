import { Project, SkillsMap } from "@/types/general"
import { GetStaticPropsResult } from "next"
import { contentfulCMS as cms } from "../libs/contentful-cms"

import PageHead from "@/components/PageHead"
import ScrollToTopButton from "@/components/buttons/ScrollToTopButton"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Main from "@/components/layout/Main"
import About from "../components/layout/sections/About"
import Hero from "../components/layout/sections/Hero"
import Projects from "../components/layout/sections/Projects"
import Skills from "../components/layout/sections/Skills"

interface HomeProps {
    projectList: Project[]
    skillsMap: SkillsMap
}

//Buscando as informações dos projetos e habilidades na contenful CMS.
export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
    const [projectEntries, skillEntries] = await cms.fetchData()

    const skillsMap = cms.generateSkillsMap(skillEntries)
    const projectList = await cms.getFormattedProjectList(projectEntries)

    return {
        props: {
            projectList,
            skillsMap
        },
        revalidate: 60
    }
}

export default function Home({ projectList, skillsMap }: HomeProps) {
    return (
        <>
            <PageHead />
            <>
                <Header />
                <Main>
                    <Hero />
                    <About />
                    <Projects projectList={projectList || []} />
                    <Skills skillsMap={skillsMap || {}} />
                </Main>
                <Footer />
                <ScrollToTopButton />
            </>
        </>
    )
}
