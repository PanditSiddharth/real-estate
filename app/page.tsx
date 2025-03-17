import { baseUrl, fetchApi } from "../utils/fetchData";
import {Home} from "@/components/home";

export default async function Page() {
  // const propertyForSale = await fetchApi(
  //   `${baseUrl}/properties/detail?externalID=4937770`
  // );
  // // const propertyForRent = await fetchApi(
  // //   `${baseUrl}/properties/detail?externalID=4937770`
  // // );

  // console.log(propertyForSale)

 const propertyForSale = {
    "_id": "65f123456789abcdef123456",
    "ownerID": "960420",
    "userExternalID": "960420",
    "state": "inactive",
    "geography": {
      "lat": 25.124783,
      "lng": 55.153324
    },
    "purpose": "for-sale",
    "price": 530000000,
    "product": "premium",
    "productLabel": "default",
    "rentFrequency": null,
    "referenceNumber": "1998-Rp-S-0009",
    "permitNumber": "7181198593",
    "projectNumber": null,
    "title": "Build your 5 Star Resort on the Beach, Palm Jumeirah",
    "title_l1": "ارض لبناء منتجع في نخلة جميرا",
    "title_l2": "位于朱美拉棕榈岛，新月城 的住宅地块 530000000 AED - 4937770",
    "title_l3": "Участок в Палм Джумейра，Кресент, 530000000 AED - 4937770",
    "description": "RARE Opportunity to Build a resort on the Palm Jumeirah with beach access and panoramic sea view...",
    "externalID": "4937770",
    "slug": "build-your-5-star-resort-on-the-beach-palm-jumeirah-4937770",
    "location": [
      {
        "id": 1,
        "level": 0,
        "externalID": "5001",
        "name": "UAE",
        "slug": "/uae"
      },
      {
        "id": 2,
        "level": 1,
        "externalID": "5002",
        "name": "Dubai",
        "slug": "/dubai"
      },
      {
        "id": 14,
        "level": 2,
        "externalID": "5460",
        "name": "Palm Jumeirah",
        "slug": "/dubai/palm-jumeirah"
      },
      {
        "id": 285,
        "level": 3,
        "externalID": "8902",
        "name": "The Crescent",
        "slug": "/dubai/palm-jumeirah/the-crescent"
      }
    ],
    "category": [
      {
        "id": 1,
        "level": 0,
        "externalID": "1",
        "name": "Residential",
        "slug": "residential"
      },
      {
        "id": 11,
        "level": 1,
        "externalID": "14",
        "name": "Plots",
        "slug": "residential-plots"
      }
    ],
    coverPhoto: {
      id: 110798997,
      externalID: '103391151',
      title: 'Palm Jumeirah',
      orderIndex: 0,
      nimaScore: 5.999995438928998,
      url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110798997/d9446cee36ba4f839c8fedd0e0b52208',
      main: true
    },
    agency: {
      logo: {
      url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110798997/d9446cee36ba4f839c8fedd0e0b52208', 
      }
    },
    photos: [
      {
        id: 110798997,
        externalID: '103391151',
        title: 'Palm Jumeirah',
        orderIndex: 0,
        nimaScore: 5.999995438928998,
        url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110798997/d9446cee36ba4f839c8fedd0e0b52208'
      },
      {
        id: 110799000,
        externalID: '103391152',
        title: 'Build your 5 Star Resort on the Beach',
        orderIndex: 1,
        nimaScore: 5.969393613838337,
        url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110799000/13c5ddeb3710480ab040480678519575'
      },
      {
        id: 110799002,
        externalID: '103391153',
        title: 'Palm Jumeirah',
        orderIndex: 2,
        nimaScore: 5.995129640790738,
        url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110799002/8ab6592e4ea7409fb05af756b7b80a03'
      }
    ],
    "createdAt": 1609632442,
    "approvedAt": 1609632442,
    "updatedAt": 1632407610,
    "touchedAt": 1717101196,
    "reactivatedAt": 1609632442,
    "rooms": 0,
    "baths": 0
  }
  
//  return <div>HI</div> 
 return <Home propertyForSale={[propertyForSale]} propertyForRent={[propertyForSale]} />
}