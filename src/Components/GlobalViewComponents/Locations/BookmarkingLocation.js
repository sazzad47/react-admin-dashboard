import { Cartesian3, HeightReference } from 'cesium'
import React, { useContext } from 'react'
import { BillboardGraphics, Entity, EntityDescription } from 'resium'
import { StateContext } from '../../../pages/Pages/GlobalViewPage/StateProvider'
import { DescriptionTable } from '../Common';
import yellow_icon from '../asset/images/yellow_icon.png';
import red_icon from '../asset/images/red_icon.jpg';
import green_icon from '../asset/images/green_icon.png';


const BookmarkingLocation = () => {
    const { bookmarking } = useContext(StateContext);
    const icons = [yellow_icon, red_icon, green_icon];
    if (!bookmarking?.long) return // Doesn't render if user hasn't clicked a location

    return (
        <Entity
            position={Cartesian3.fromDegrees(parseFloat(bookmarking?.long), parseFloat(bookmarking?.lat), parseFloat(bookmarking?.alt))}
            name={bookmarking?.name}
            
        >
            <EntityDescription>
                <DescriptionTable longitude={parseFloat(bookmarking?.long)} latitude={parseFloat(bookmarking?.lat)} date={bookmarking?.date} desc={bookmarking?.desc} />
            </EntityDescription>
            {bookmarking?.icon === "Yellow" && (
                <BillboardGraphics heightReference={HeightReference.CLAMP_TO_GROUND} image={icons[0]} scale={0.08}  />
            )}
            {bookmarking?.icon === "Red" && (
                <BillboardGraphics heightReference={HeightReference.CLAMP_TO_GROUND} image={icons[1]} scale={0.05} />
            )}
            {bookmarking?.icon === "Green" && (
                <BillboardGraphics heightReference={HeightReference.CLAMP_TO_GROUND} image={icons[2]} scale={0.05} />
            )}
        </Entity>
    )
}

export default BookmarkingLocation;
