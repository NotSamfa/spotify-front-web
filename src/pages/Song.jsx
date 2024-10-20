import { useParams } from "react-router-dom"
import Layout from "../components/Layout"

function Song() {
    const {name} = useParams()

    return (
        <Layout>
            <h1>{name}</h1>
        </Layout>
    )
}

export default Song
