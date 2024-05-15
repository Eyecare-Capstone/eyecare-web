export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return new Response(null, {
    status: 302,
    headers: {
      Location: BASE_URL!,
    },
  });
}

export async function PUT(req: Request) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const requestKey = req.headers.get("Authorization");
    if (API_KEY == requestKey) {
      const { accessToken, refreshToken } = await req.json();

      const accessTokenCookie = `access_token=${accessToken}; SameSite=Lax; HttpOnly=false; Secure=false; Max-Age=2592000`;
      const refreshTokenCookie = `refresh_token=${refreshToken}; SameSite=Lax; HttpOnly=false; Secure=false; Max-Age=2592000`;

      const headers = new Headers();
      headers.append("Set-Cookie", accessTokenCookie);
      headers.append("Set-Cookie", refreshTokenCookie);

      return new Response("success", {
        status: 200,
        headers: headers,
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: BASE_URL!,
      },
    });
  } catch (e) {
    console.log("route PUT error:", e);
    return new Response("error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const requestKey = req.headers.get("Authorization");
    if (API_KEY == requestKey) {
      const adminData = await req.json();

      const adminDataCookie = `admin_data=${encodeURIComponent(
        adminData
      )}; SameSite=Lax; HttpOnly=false; Secure=false; Max-Age=2592000`;

      const headers = new Headers();
      headers.append("Set-Cookie", adminDataCookie);

      return new Response("success", {
        status: 200,
        headers: headers,
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: BASE_URL!,
      },
    });
  } catch (e) {
    console.log("route POST error:", e);
    return new Response("error", {
      status: 500,
    });
  }
}
