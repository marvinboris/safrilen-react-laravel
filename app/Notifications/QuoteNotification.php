<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QuoteNotification extends Notification
{
    use Queueable;

    private $quote;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($quote)
    {
        $this->quote = $quote;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Nouvelle demande de devis !')
            ->line('Nom(s) et prénom(s): ' . $this->quote['first_name'] . ' ' . $this->quote['last_name'])
            ->line('Localisation: ' . $this->quote['location'])
            ->line('Adresse mail: ' . $this->quote['email'])
            ->line('Numéro de téléphone: ' . $this->quote['phone'])
            ->line('Service(s) demandé(s): ' . implode(', ', $this->quote['services']))
            ->line('Message: ' . $this->quote['message'])
            ->line('Merci d\'utiliser notre application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
