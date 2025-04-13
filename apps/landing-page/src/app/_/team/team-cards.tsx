"use client";

import { Button } from "@gdapps-studio/ui/button";
import { Card } from "@gdapps-studio/ui/card";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useInView } from "react-intersection-observer";

type TeamMember = {
  name: string;
  position: string;
  description: string;
  image: string;
  isApplicationCard?: boolean;
};

const teamMembers: TeamMember[] = [
  {
    name: "0xNinja",
    position: "Lead Developer",
    description:
      "Experienced Web3 developer specializing in DeFi protocols and smart contract integration.",
    image: "/assets/team/ninja.webp",
    isApplicationCard: false,
  },
  {
    name: "0xSlizzard",
    position: "Frontend Developer",
    description:
      "Creative frontend developer crafting intuitive Web3 interfaces with expertise in React, Next.js, and modern UI/UX principles.",
    image: "/assets/team/slizzard.webp",
    isApplicationCard: false,
  },
  {
    name: "Looking for a job?",
    position: "Join Our Team",
    description:
      "Apply now to become a developer and be part of our innovative Web3 journey.",
    image: "/assets/team/homeless-npc.webp",
    isApplicationCard: true,
  },
];

const TeamCard = ({ member, delay }: { member: TeamMember; delay: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    config: { duration: 250 },
    delay,
  });

  return (
    // @ts-expect-error not sure why this is not working
    <animated.div ref={ref} style={fadeIn}>
      <Card
        scaleOnHover={!member.isApplicationCard}
        className={clsx(
          `p-6 flex flex-col items-center text-center min-h-[400px]`,
          {
            "opacity-60 hover:opacity-100":
              member.isApplicationCard && !selectedFile,
          }
        )}
      >
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-primary/20">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-semibold mb-2 font-oxanium">
          {member.name}
        </h3>
        <p className="text-primary mb-3 font-medium">{member.position}</p>
        <p className="text-gray-300 leading-relaxed">{member.description}</p>
        {member.isApplicationCard && (
          <div className="mt-6">
            <input
              type="file"
              accept=".pdf"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.type !== "application/pdf") {
                    alert("Please upload a PDF file");
                    return;
                  }
                  setSelectedFile(file);
                }
              }}
              className="hidden"
              id={`cv-upload-${member.name}`}
            />
            <Button
              className="w-full"
              loading={loading}
              onClick={
                selectedFile
                  ? async () => {
                      const formData = new FormData();
                      formData.append("cv", selectedFile);
                      try {
                        setLoading(true);
                        const response = await fetch("/api/send-cv", {
                          method: "POST",
                          body: formData,
                        });
                        if (!response.ok) throw new Error("Failed to send CV");
                        setSelectedFile(null);
                        alert("CV sent successfully!");
                      } catch (error) {
                        console.error("Error sending CV:", error);
                        alert("Failed to send CV. Please try again.");
                      }
                      setLoading(false);
                    }
                  : () =>
                      document
                        .getElementById(`cv-upload-${member.name}`)
                        ?.click()
              }
            >
              {selectedFile ? "Send CV" : "Upload CV"}
            </Button>
            {selectedFile && (
              <p className="text-sm text-gray-400 mt-2 truncate max-w-full">
                {selectedFile.name}
              </p>
            )}
          </div>
        )}
      </Card>
    </animated.div>
  );
};

export const TeamCards = () => (
  <div className="grid md:grid-cols-3 gap-8 mt-12">
    {teamMembers.map((member, index) => (
      <TeamCard key={member.name} member={member} delay={index * 100} />
    ))}
  </div>
);
