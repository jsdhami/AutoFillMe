import Image from "next/image";
import { FC } from "react";
import {
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoFacebook,
} from "react-icons/bi";

interface TeamMemberProps {
  name: string;
  qualification: string;
  image: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

const TeamMember: FC<TeamMemberProps> = ({
  name,
  qualification,
  image,
  twitter,
  facebook,
  instagram,
  linkedin,
}) => {
  return (
    <div
      className="group relative flex flex-col items-center bg-gray-900 bg-opacity-75 p-4 rounded-lg shadow-lg 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      data-aos="fade-up"
    >
      <div className="pic mb-4 overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={`${name}'s picture`}
          width={250}
          height={250}
          className="transform transition-transform duration-500 group-hover:scale-110 object-cover"
        />
      </div>
      <h4 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
        {name}
      </h4>
      <span className="text-sm p-1 text-white opacity-80 transition-opacity duration-300 group-hover:opacity-100">
        {qualification}
      </span>
      <div className="social mt-3 flex space-x-3">
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-75 hover:opacity-100 transform transition-all duration-300 hover:scale-125 hover:text-blue-400"
          >
            <BiLogoTwitter size={24} />
          </a>
        )}
        {facebook && (
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-75 hover:opacity-100 transform transition-all duration-300 hover:scale-125 hover:text-blue-600"
          >
            <BiLogoFacebook size={24} />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-75 hover:opacity-100 transform transition-all duration-300 hover:scale-125 hover:text-pink-500"
          >
            <BiLogoInstagram size={24} />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-75 hover:opacity-100 transform transition-all duration-300 hover:scale-125 hover:text-blue-500"
          >
            <BiLogoLinkedin size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

const Team: FC = () => {
  return (
    <section
      id="team"
      className="bg-gray-800 bg-opacity-25 text-white py-8 lg:h-[calc(100vh-6rem)]"
    >
      <div className="container mx-auto px-8 h-full flex flex-col items-center" data-aos="fade-up h-full">
        <div className="section-header text-center my-8">
          <h3 className="section-title text-xl font-semibold text-white transform transition-all duration-500 hover:scale-105">
            Team Aakash
          </h3>
          <p className="section-description text-md text-white mt-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
            Get to know the passionate minds behind our AutoFillMe!
          </p>
        </div>
        <div className="flex flex-col h-full justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Aashish Karki"
              qualification="BE. Computer | Computer Engineer"
              image="/Aashish.jpg"
              twitter="https://x.com/Manish__Pandey"
              facebook="https://www.facebook.com/manishpandeymb"
              instagram="https://instagram.com/manishpandey0003"
              linkedin="https://www.linkedin.com/in/manish-pandey-865a82286"
            />
            <TeamMember
              name="Janak Singh Dhami"
              qualification="BSc. Physics | Full Stack Developer"
              image="https://moonquake.jsdhami.com.np/assets/img/team-1.jpg"
              twitter="https://twitter.com/jsdhami1020"
              facebook="https://www.facebook.com/JsDhami.Kashyap"
              instagram="https://www.instagram.com/jsdhami1020"
              linkedin="https://www.linkedin.com/in/jsdhami1020"
            />
            <TeamMember
              name="Rishikesh Paudel"
              qualification="BE. Computer | Computer Engineer"
              image="/rishikesh.jpg"
              facebook="https://www.facebook.com/The.Rishikesh.Paudel/"
              instagram="https://www.instagram.com/rishikesh.paudel/"
              linkedin="https://www.linkedin.com/in/rishikesh-paudel/"
            />
            <TeamMember
              name="Yujal Shrestha"
              qualification="BE. Computer | Computer Engineer"
              image="/yujal.jpg"
              facebook="https://www.facebook.com/profile.php?id=100064939777956"
              instagram="https://www.instagram.com/dahal.sajeena"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
