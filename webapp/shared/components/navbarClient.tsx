"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Description,
  FieldError,
  Form,
  Header,
  Kbd,
  Label,
  SearchField,
  Separator,
  Spinner,
} from "@heroui/react";
import {
  ArrowUpFromLine,
  Sparkles,
  MagnifierMinus,
  EllipsisVertical,
  Pencil,
  SquarePlus,
  TrashBin,
} from "@gravity-ui/icons";
import { Button, Modal, Dropdown } from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";
import { ThemeSwitch } from "./themeSwitcher";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "gravity-ui:arrow-up-from-line": ArrowUpFromLine,
  "gravity-ui:sparkles": Sparkles,
};

export default function NavbarClient() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ["Home", "About", "Services", "Contact"];

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
  ];

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
    <header className="w-full  min-h-12 absolute top-0 left-0 p-6 z-0">
      <div className="w-full border  border-black/10 dark:border-white/10 rounded-full p-4 flex flex-row">
        <div className=" w-1/4 max-md:w-3/4 max-md:justify-start flex text-center gap-4 items-center justify-center">
          <Image
            src="/vercel.svg"
            alt="vercel-svg"
            width={40}
            height={40}
            className="invert-[0.8] max-sm:hidden"
          />
          <Image
            src="/next.svg"
            alt="vercel-svg"
            width={100}
            height={100}
            className="dark:invert"
          />
        </div>
        <div className="border border-dashed flex flex-row mx-auto border-black/10 dark:border-white/10 rounded-full text-center items-center justify-center w-2/4 max-md:hidden bg-black text-white dark:bg-white dark:text-black ">
          {links.map(({ href, label, icon }) => (
            <Link href={href} key={href} className="mx-3">
              {label}
            </Link>
          ))}
        </div>
        <div className=" gap-2 w-1/4 max-md:w-2/4 flex flex-row justify-end">
          <Dropdown>
            <Button isIconOnly aria-label="Menu" variant="secondary">
              <EllipsisVertical className="outline-none" />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                onAction={(key) => console.log(`Selected: ${key}`)}
              >
                <Dropdown.Section>
                  <Header>Actions</Header>
                  <Dropdown.Item id="new-file" textValue="New file">
                    <div className="flex h-8 items-start justify-center pt-px">
                      <SquarePlus className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <Label>New file</Label>
                      <Description>Create a new file</Description>
                    </div>
                    <Kbd className="ms-auto" slot="keyboard" variant="light">
                      <Kbd.Abbr keyValue="command" />
                      <Kbd.Content>N</Kbd.Content>
                    </Kbd>
                  </Dropdown.Item>
                  <Dropdown.Item id="edit-file" textValue="Edit file">
                    <div className="flex h-8 items-start justify-center pt-px">
                      <Pencil className="size-4 shrink-0 text-muted" />
                    </div>
                    <div className="flex flex-col">
                      <Label>Edit file</Label>
                      <Description>Make changes</Description>
                    </div>
                    <Kbd className="ms-auto" slot="keyboard" variant="light">
                      <Kbd.Abbr keyValue="command" />
                      <Kbd.Content>E</Kbd.Content>
                    </Kbd>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Separator />
                <Dropdown.Section>
                  <Header>Danger zone</Header>
                  <Dropdown.Item
                    id="delete-file"
                    textValue="Delete file"
                    variant="danger"
                  >
                    <div className="flex h-8 items-start justify-center pt-px">
                      <TrashBin className="size-4 shrink-0 text-danger" />
                    </div>
                    <div className="flex flex-col">
                      <Label>Delete file</Label>
                      <Description>Move to trash</Description>
                    </div>
                    <Kbd className="ms-auto" slot="keyboard" variant="light">
                      <Kbd.Abbr keyValue="command" />
                      <Kbd.Abbr keyValue="shift" />
                      <Kbd.Content>D</Kbd.Content>
                    </Kbd>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <Separator orientation="vertical" />
          <ThemeSwitch />
          <Separator orientation="vertical" />
          {animations.map(({ classNames, description, icon, name }) => {
            const IconComponent = iconMap[icon];
            return (
              <Modal>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                >
                  <Button isIconOnly className="color-secondary rounded-full">
                    {name}
                  </Button>
                </motion.div>
                <Modal.Backdrop className={classNames.backdrop} variant="blur">
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
                                Enter at least {MIN_LENGTH} characters to search
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
  );
}
