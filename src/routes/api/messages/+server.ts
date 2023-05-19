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
