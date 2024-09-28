import {
  Controller,
  Post,
  Param,
  Req,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('payments') // Group under 'payments' tag in Swagger UI
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Endpoint to create a Stripe payment intent
  @Post('create-payment-intent/:orderId')
  @ApiOperation({ summary: 'Create a payment intent for an order' }) // Describe the endpoint
  @ApiParam({ name: 'orderId', description: 'ID of the order' }) // Describe the parameter
  async createPaymentIntent(@Param('orderId') orderId: number) {
    if (!orderId) {
      throw new BadRequestException('Order ID is required');
    }
    return this.paymentsService.createPaymentIntent(orderId);
  }

  // Webhook endpoint to handle Stripe events
  @Post('webhook')
  @ApiOperation({ summary: 'Handle Stripe webhook events' }) // Describe the endpoint
  async handleWebhook(
    @Headers('stripe-signature') sig: string,
    @Req() request: Request,
  ) {
    const body = request.body;

    // Delegate the webhook handling logic to the PaymentsService
    const stripeEvent = await this.paymentsService.handleStripeWebhook(
      sig,
      body,
    );
    await this.paymentsService.handleWebhook(stripeEvent);
  }
}
