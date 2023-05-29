const contentful = require("contentful")

//Iniciando o client do CMS
export function initiateClient() {
    const client = contentful.createClient({
        space: process.env.CMS_SPACE_ID,
        environment: process.env.CMS_ENVIROMENT_NAME,
        accessToken: process.env.CMS_ACCESS_TOKEN
    })

    return client
}

//Formatando os dados dos projetos vindos do CMS antes de utiliza-los.
export function organizeProjectsData(entries) {
    const { items, includes } = entries

    const bannersData = includes.Asset.reduce((acc, asset) => {
        acc[asset.sys.id] = {
            alt: asset.fields.description,
            url: "https:" + asset.fields.file.url,
            width: asset.fields.file.details.image.width,
            height: asset.fields.file.details.image.height
        }
        return acc
    }, {})

    const projectsData = items.map((item) => ({
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
        description: item.fields.description,
        projectUrl: item.fields.projectUrl,
        githubUrl: item.fields.githubUrl,
        techList: item.fields.techList,
        banner: bannersData[item.fields.banner.sys.id]
    }))

    return projectsData
}

//Formatando os dados das habilidades vindas do CMS antes de utiliza-los.
export function organizeSkillsData(entries) {
    const { items } = entries

    const skillsData = items.reduce((acc, item) => {
        acc[item.fields.slug] = {
            name: item.fields.name,
            description: item.fields.description
        }
        return acc
    }, {})

    return skillsData
}
