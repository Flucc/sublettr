import { supabase } from '$lib/supabase.js';

export async function GET({ url }: any) {
    // Extract the user ID from the request
    const user_id = url.searchParams.get('userId');

    // Fetch the messages sent by the user
    const { data: messages, error: sentError } = await supabase
        .from('messages')
        .select('*, message_texts(*)')
        .or(`sender_id.eq.${user_id},receiver_id.eq.${user_id}`);

    // If there was an error, return it
    if (sentError) {
        console.error(sentError);
        return new Response(JSON.stringify({ sentError }), { status: 500 });
    }

    // Return the messages
    return new Response(JSON.stringify({ messages }), { status: 200 });
}


export async function POST({ request }) {
    // Extract the sender_id, receiver_id, and message_text from the request body
    const { sender_id, receiver_id, message_text, listing_id } = await request.json();

    // Create a new row in the message_texts table
    const { data: message_text_data, error: textError } = await supabase
        .from('message_texts')
        .insert([
            { message_text }
        ])
        .select();
    // If there was an error, return it
    if (textError) {
        console.error(textError);
        return new Response(JSON.stringify({ textError }), { status: 500 });
    }

    // Create a new row in the messages table
    const { data: message_data, error: messageError } = await supabase
        .from('messages')
        .insert([
            { sender_id, receiver_id, message_text_id:message_text_data[0].id, listing_id:listing_id }
        ])
        .select();

    // If there was an error, return it
    if (messageError) {
        console.error(messageError);
        return new Response(JSON.stringify({ messageError }), { status: 500 });
    }

    // Return the created message
    return new Response(JSON.stringify({ message: message_data[0] }), { status: 200 });
}

