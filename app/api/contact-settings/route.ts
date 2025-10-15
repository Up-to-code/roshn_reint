// app/api/contact-settings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch contact settings
export async function GET() {
  try {
    // Get the first (and only) settings record
    let settings = await prisma.contactSettings.findFirst();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await prisma.contactSettings.create({
        data: {
          phoneNumber: '+966501234567',
          whatsappNumber: '966501234567',
          showPhone: true,
          showWhatsApp: true,
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching contact settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact settings' },
      { status: 500 }
    );
  }
}

// PUT - Update contact settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, whatsappNumber, showPhone, showWhatsApp } = body;

    // Validate input
    if (!phoneNumber || !whatsappNumber) {
      return NextResponse.json(
        { error: 'Phone number and WhatsApp number are required' },
        { status: 400 }
      );
    }

    // Get existing settings or create new
    let settings = await prisma.contactSettings.findFirst();
    
    if (settings) {
      // Update existing
      settings = await prisma.contactSettings.update({
        where: { id: settings.id },
        data: {
          phoneNumber,
          whatsappNumber,
          showPhone: showPhone ?? true,
          showWhatsApp: showWhatsApp ?? true,
        },
      });
    } else {
      // Create new
      settings = await prisma.contactSettings.create({
        data: {
          phoneNumber,
          whatsappNumber,
          showPhone: showPhone ?? true,
          showWhatsApp: showWhatsApp ?? true,
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating contact settings:', error);
    return NextResponse.json(
      { error: 'Failed to update contact settings' },
      { status: 500 }
    );
  }
}