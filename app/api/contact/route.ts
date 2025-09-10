import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // For now, we'll just log the message and return success
    // In a real implementation, you would send this to your email
    console.log('📧 New Contact Form Message:');
    console.log('============================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('============================');

    // TODO: Implement actual email sending here
    // You can use services like:
    // - EmailJS (recommended for client-side)
    // - Nodemailer with Gmail SMTP
    // - SendGrid
    // - Resend
    // - Formspree

    return NextResponse.json({
      success: true,
      message: 'Message received! I\'ll get back to you soon. For immediate contact, please email me directly at vivekpatil0088@gmail.com'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again or contact me directly at vivekpatil0088@gmail.com' },
      { status: 500 }
    );
  }
}
