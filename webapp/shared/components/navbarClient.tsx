"use client";

import Image from "next/image";
import Link from "next/link";
import { Description, FieldError, Form, Label, SearchField, Separator, Spinner } from "@heroui/react";
import { ArrowUpFromLine, Sparkles, MagnifierMinus } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "gravity-ui:arrow-up-from-line": ArrowUpFromLine,
  "gravity-ui:sparkles": Sparkles,
};

export default function NavbarClient() {
  const [value, setValue] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const MIN_LENGTH = 3;
  const isInvalid = value.length > 0 && value.length < MIN_LENGTH;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < MIN_LENGTH) {
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Search submitted:", { query: value });
      setValue("");
      setIsSubmitting(false);
    }, 1500);
  };

  const links = [
    {
      href: "/",
      label: "Home",
      icon: "gravity-ui:sparkles",
    },
    {
      href: "/about",
      label: "About our project",
      icon: "gravity-ui:arrow-up-from-line",
    },
    {
      href: "/contact",
      label: "",
      icon: "gravity-ui:arrow-up-from-line",
    },
  ]

  const animations = [
    {
      classNames: {
        backdrop: [
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:slide-in-from-bottom-4",
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:slide-out-to-bottom-2",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
      },
      description:
        "Simulates movement through a medium with fluid resistance. Eliminates mechanical linearity for a natural, grounded feel. Perfect for Bottom Sheets or Toasts.",
      icon: "gravity-ui:arrow-up-from-line",
      name: <MagnifierMinus />,
    },
  ];
  return (
    <div className="absolute py-12 px-24 top-0 left-0 w-full">
      <header className="flex flex-row items-center min-h-16  rounded-full   border-gray-500 dark:border-white/10 cursor-pointer border shadow-md shadow-black/10 shadow-blur">
        <div className="flex  px-12 flex-row items-center justify-center">
          <Image
            src="/vercel.svg"
            alt="logo"
            width={40}
            height={40}
            className=""
          />
          <Separator orientation="vertical"  />
        </div>

        <div className="flex max-xl:hidden flex-row w-full  text-center items-center justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm  mx-4 font-medium text-gray-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className=" max-xl:justify-around max-xl:w-full px-12 flex flex-row text-center items-center justify-center">
          <Link href="/" className="text-sm text-white font-bold">
            Login
          </Link>
          <Separator className="my-4 mx-2 bg-white/10" orientation="vertical" />
          <div className="flex flex-wrap gap-4">
            {animations.map(({ classNames, description, icon, name }) => {
              const IconComponent = iconMap[icon];
              return (
                <Modal>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                  >
                    <Button
                      variant="primary"
                      isIconOnly
                      className="bg-indigo-500 rounded-full"
                    >
                      {name}
                    </Button>
                  </motion.div>
                  <Modal.Backdrop
                    className={classNames.backdrop}
                    variant="blur"
                  >
                    <Modal.Container className={classNames.container}>
                      <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                          <Form
                            className="flex w-[280px] flex-col gap-4"
                            onSubmit={handleSubmit}
                          >
                            <SearchField
                              isRequired
                              isInvalid={isInvalid}
                              name="search"
                              value={value}
                              onChange={setValue}
                            >
                              <Label>Search products</Label>
                              <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input
                                  className="w-full"
                                  placeholder="Search products..."
                                />
                                <SearchField.ClearButton />
                              </SearchField.Group>
                              {isInvalid ? (
                                <FieldError>
                                  Search query must be at least {MIN_LENGTH}{" "}
                                  characters
                                </FieldError>
                              ) : (
                                <Description>
                                  Enter at least {MIN_LENGTH} characters to
                                  search
                                </Description>
                              )}
                            </SearchField>
                            <Button
                              className="w-full"
                              isDisabled={value.length < MIN_LENGTH}
                              isPending={isSubmitting}
                              type="submit"
                              variant="primary"
                            >
                              {isSubmitting ? (
                                <>
                                  <Spinner color="current" size="sm" />
                                  Searching...
                                </>
                              ) : (
                                "Search"
                              )}
                            </Button>
                          </Form>
                        </Modal.Header>
                        <Modal.Body></Modal.Body>
                        <Modal.Footer>
                          <Button slot="close" variant="tertiary">
                            Close
                          </Button>
                          <Button slot="close">Try Again</Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}
