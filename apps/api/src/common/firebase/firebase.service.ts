import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { GetUserType, Role } from '../../common/types'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App

  constructor(private readonly prisma: PrismaService) {
    try {
      const firebasePrivateKey = process.env.firebasePrivateKey
        ? process.env.firebasePrivateKey
            .replace(/\\n/g, '\n')
            .replace(/^"|"$/g, '')
        : ''
      if (
        firebasePrivateKey &&
        firebasePrivateKey.includes('BEGIN PRIVATE KEY')
      ) {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            clientEmail: process.env.firebaseClientEmail,
            privateKey: firebasePrivateKey,
            projectId: process.env.firebaseProjectId,
          }),
        })
      } else {
        console.log(
          'No valid Firebase private key found. Running in mock auth mode.',
        )
      }
    } catch (e) {
      console.warn(
        'Failed to initialize Firebase Admin. Running in mock auth mode.',
        e,
      )
    }
  }

  getAuth = (): any => {
    if (!this.firebaseApp) {
      return {
        verifyIdToken: async (token: string) => {
          console.log('Mocking verifyIdToken for token:', token)
          let uid = 'mock-user-123'
          let roles = ['admin', 'manager', 'valet', 'customer']
          if (token && token.startsWith('local-dev-')) {
            const parts = token.split('-')
            uid = parts[2] || uid
            if (parts[3]) {
              roles = [parts[3]]
            }
          }
          return { uid, roles }
        },
        getUser: async (uid: string) => {
          console.log('Mocking getUser for uid:', uid)
          return {
            uid,
            displayName: 'Mock User (' + uid + ')',
            email: `${uid}@example.com`,
          }
        },
        createUser: async (args: any) => {
          console.log('Mocking createUser for:', args)
          return {
            uid:
              args.uid ||
              'mock-user-' + Math.random().toString(36).substring(7),
            displayName: args.displayName || 'Mock User',
            email: args.email,
          }
        },
        setCustomUserClaims: async (uid: string, claims: any) => {
          console.log('Mocking setCustomUserClaims for:', uid, claims)
          return {}
        },
      }
    }
    return this.firebaseApp.auth()
  }
  async setRole(user: GetUserType, role: Role) {
    const existingroles = user?.roles || []
    if (existingroles.includes(role)) {
      //   throw new BadRequestException(`User already has this role. ${role}`)
      console.error(`User already has this role. ${role}`)
      return
    }

    const updatedRoles = [...existingroles, role]

    await this.firebaseApp
      .auth()
      .setCustomUserClaims(user.uid, {
        roles: updatedRoles,
      })
      .then((res) => {
        console.log(`Successfully set ${JSON.stringify(res)}`)
      })

    return
  }
}
