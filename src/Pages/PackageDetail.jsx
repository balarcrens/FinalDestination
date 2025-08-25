import { useParams } from "react-router-dom"

export default function PackageDetail() {
    const { tour_name } = useParams();

    return (
        <div>{tour_name} PackageDetail</div>
    )
}
