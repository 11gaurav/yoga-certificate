import clientPromise from "@/lib/mongodb";

export async function POST(req) {

  try {

    const body = await req.json();

    const name = body.name.trim();
    const mobile = body.mobile.trim();

    // Name validation
    if (!name || /\d/.test(name)) {
      return Response.json({
        success: false,
        message: "Invalid Name"
      });
    }
    if (name.length > 22) {
      return Response.json({
        success: false,
        message: "Name is too long"
      });
    }
    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
      return Response.json({
        success: false,
        message: "Invalid Mobile Number"
      });
    }

    const client = await clientPromise;

    const db = client.db("yogaDB");

    // Duplicate check
    const existing = await db.collection("users").findOne({
      mobile
    });

    if (existing) {
      return Response.json({
        success: false,
        message: "Mobile number already registered"
      });
    }

    // Save user
    await db.collection("users").insertOne({
      name,
      mobile,
      createdAt: new Date()
    });

    return Response.json({
      success: true
    });

  } catch (error) {

    console.log("MONGO ERROR:", error);

    return Response.json({
      success: false,
      message: "Server Error"
    });
  }
}