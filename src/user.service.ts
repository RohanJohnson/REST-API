import { Body, Injectable, Query, UnsupportedMediaTypeException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


@Injectable()
export class UserService {

  async newUser(data) {  //takes in query data and, if eligable, makes a new user

    let state: string

    const allUsers = await prisma.user.findMany()

    let check: boolean;

    allUsers.forEach(element => {

      if (element.email == data.mail) {
        check = true
        // unused for now but this check could help with error output to the user.
      }
      else {
        check = false
      }

    });

    try {

      await prisma.user.create({
        data: data
      })

      state = "account created"
      return state

    } catch {
      state = "email is already in use"
      return state
    }

  }

  async getUsers(): Promise<any> {

    const allUsers = await await prisma.user.findMany()
    allUsers.forEach(element => element['pass'] = "hidden")
    return allUsers

  }

  async deleteUser(data) {

    const email = data['email']
    const pass = data['pass']



    const getUserPass = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        pass: true,
      },
    })

    if (getUserPass.pass == pass) {
      await prisma.user.deleteMany({
        where: { email: email }
      })
      return "account deleted"
    } else {
      return "email or password incorrect"
    }



  }

  async login(data) {

    const email = data['email']
    const pass = data['pass']

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          pass: pass,
        },
      })
      user['pass'] = "hidden"
      return user
    } catch {
      return "email or password incorrect"
    }

  }

}

