"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Save, Tag } from "lucide-react";

interface SegmentDetailsFormProps {
  details: {
    name: string;
    description: string;
    tags: string[];
  };
  onDetailsChange: (details: any) => void;
  onSubmit: () => void;
}

export function SegmentDetailsForm({
  details,
  onDetailsChange,
  onSubmit,
}: SegmentDetailsFormProps) {
  const [newTag, setNewTag] = useState("");
  
  const handleTagAdd = () => {
    if (newTag && !details.tags.includes(newTag)) {
      onDetailsChange({
        ...details,
        tags: [...details.tags, newTag],
      });
      setNewTag("");
    }
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    onDetailsChange({
      ...details,
      tags: details.tags.filter((tag) => tag !== tagToRemove),
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Segment Details</CardTitle>
        <CardDescription>
          Add a name, description, and tags for your segment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Segment Name</Label>
          <Input
            id="name"
            placeholder="e.g., High-Value Customers"
            value={details.name}
            onChange={(e) => onDetailsChange({ ...details, name: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the purpose of this segment"
            value={details.description}
            onChange={(e) => onDetailsChange({ ...details, description: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button type="button" onClick={handleTagAdd} variant="secondary">
              <Tag className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          {details.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {details.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="pl-2">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} tag</span>
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onSubmit} disabled={!details.name}>
          <Save className="mr-2 h-4 w-4" />
          Save Segment
        </Button>
      </CardFooter>
    </Card>
  );
}