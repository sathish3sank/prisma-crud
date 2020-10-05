import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateUserReqBodyT } from "./type";

let prisma = new PrismaClient();

export const userRouter = Router();

userRouter.get("/list", async (req, res) => {
  let users = await prisma.users.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      contactdetails: true,
    },
  });
  res.json({ users });
});

userRouter.get("/:id", async (req, res) => {
  let user = await prisma.users.findOne({
    where: { id: parseInt(req.params.id) },
    include: { contactdetails: true },
  });
  res.json({ user });
});

userRouter.post("/create", async (req, res) => {
  let body: CreateUserReqBodyT = req.body;
  let user = await prisma.users.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      contactdetails: {
        create: {
          father: body.father,
          mobile: body.mobile,
          home: body.home,
          mother: body.mother,
        },
      },
    },
    include: {
      contactdetails: true,
    },
  });
  res.json({ user });
});

userRouter.put("/update/:id", async (req, res) => {
  let body: CreateUserReqBodyT = req.body;
  let user = await prisma.users.update({
    where: { id: parseInt(req.params.id) },
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      contactdetails: {
        update: {
          where: {
            userId: parseInt(req.params.id),
          },
          data: {
            father: body.father,
            mobile: body.mobile,
            mother: body.mother,
            home: body.home,
          },
        },
      },
    },
    include: { contactdetails: true },
  });
  res.json({ user });
});

userRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let user = await prisma.users.delete({
    where: { id: parseInt(id) },
  });
  console.log(user);
  res.json({ user });
});
